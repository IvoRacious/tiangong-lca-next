import { getSourceTableAll, getSourceTablePgroongaSearch } from '@/services/sources/api';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { Card, Input, Space, Tooltip } from 'antd';
import { useRef, useState } from 'react';
import { FormattedMessage, useIntl, useLocation } from 'umi';

import { ListPagination } from '@/services/general/data';
import { getLang } from '@/services/general/util';
import { SourceTable } from '@/services/sources/data';
import { PageContainer } from '@ant-design/pro-components';
import ProTable from '@ant-design/pro-table';
import { SearchProps } from 'antd/es/input/Search';
import type { FC } from 'react';
import SourceCreate from './Components/create';
import SourceDelete from './Components/delete';
import SourceEdit from './Components/edit';
import SourceView from './Components/view';

const { Search } = Input;

const TableList: FC = () => {
  const [keyWord, setKeyWord] = useState<any>('');

  const location = useLocation();
  let dataSource = '';
  if (location.pathname.includes('/mydata')) {
    dataSource = 'my';
  } else if (location.pathname.includes('/tgdata')) {
    dataSource = 'tg';
  }

  const intl = useIntl();

  const lang = getLang(intl.locale);
  const actionRef = useRef<ActionType>();
  const sourceColumns: ProColumns<SourceTable>[] = [
    {
      title: <FormattedMessage id="pages.table.title.index" defaultMessage="Index" />,
      dataIndex: 'index',
      valueType: 'index',
      search: false,
    },
    {
      title: <FormattedMessage id="pages.table.title.name" defaultMessage="Name" />,
      dataIndex: 'shortName',
      sorter: false,
      search: false,
      render: (_, row) => [
        <Tooltip key={0} placement="topLeft" title={row.shortName}>
          {row.shortName}
        </Tooltip>,
      ],
    },
    {
      title: (
        <FormattedMessage id="pages.table.title.classification" defaultMessage="Classification" />
      ),
      dataIndex: 'classification',
      sorter: false,
      search: false,
    },
    {
      title: (
        <FormattedMessage id="pages.source.publicationType" defaultMessage="Publication type" />
      ),
      dataIndex: 'publicationType',
      sorter: false,
      search: false,
    },
    {
      title: <FormattedMessage id="pages.table.title.updatedAt" defaultMessage="Updated at" />,
      dataIndex: 'modifiedAt',
      valueType: 'dateTime',
      sorter: false,
      search: false,
    },
    {
      title: <FormattedMessage id="pages.table.title.option" defaultMessage="Option" />,
      dataIndex: 'option',
      search: false,
      render: (_, row) => {
        if (dataSource === 'my') {
          return [
            <Space size={'small'} key={0}>
              <SourceView lang={lang} id={row.id} buttonType={'icon'} />
              <SourceEdit
                id={row.id}
                lang={lang}
                buttonType={'icon'}
                actionRef={actionRef}
                setViewDrawerVisible={() => {}}
              />
              <SourceDelete
                id={row.id}
                buttonType={'icon'}
                actionRef={actionRef}
                setViewDrawerVisible={() => {}}
              />
            </Space>,
          ];
        }
        return [
          <Space size={'small'} key={0}>
            <SourceView lang={lang} id={row.id} buttonType={'icon'} />
          </Space>,
        ];
      },
    },
  ];

  const onSearch: SearchProps['onSearch'] = (value) => {
    setKeyWord(value);
    actionRef.current?.setPageInfo?.({ current: 1 });
    actionRef.current?.reload();
  };

  return (
    <PageContainer header={{ title: false }}>
      <Card>
        <Search
          size={'large'}
          placeholder={intl.formatMessage({ id: 'pages.search.keyWord' })}
          onSearch={onSearch}
          enterButton
        />
      </Card>
      <ProTable<SourceTable, ListPagination>
        headerTitle={<FormattedMessage id="menu.tgdata.sources" defaultMessage="Sources" />}
        actionRef={actionRef}
        search={false}
        options={{ fullScreen: true }}
        pagination={{
          showSizeChanger: false,
          pageSize: 10,
        }}
        toolBarRender={() => {
          if (dataSource === 'my') {
            return [<SourceCreate lang={lang} key={0} actionRef={actionRef} />];
          }
          return [];
        }}
        request={async (
          params: {
            pageSize: number;
            current: number;
          },
          sort,
        ) => {
          if (keyWord.length > 0) {
            return getSourceTablePgroongaSearch(params, lang, dataSource, keyWord, {});
          }
          return getSourceTableAll(params, sort, lang, dataSource);
        }}
        columns={sourceColumns}
      />
    </PageContainer>
  );
};

export default TableList;
