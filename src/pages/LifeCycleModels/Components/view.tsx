import { CloseOutlined, ProfileOutlined } from '@ant-design/icons';
import { Grid, XFlow, XFlowGraph } from '@antv/xflow';
import { Button, Drawer, Layout, theme, Tooltip } from 'antd';
import type { FC } from 'react';
import { useState } from 'react';
import { FormattedMessage } from 'umi';
import Toolbar from './toolbar';

type Props = {
  id: string;
  version: string;
  buttonType: string;
  lang: string;
};
const LifeCycleModelView: FC<Props> = ({ id, version, buttonType, lang }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const { token } = theme.useToken();

  const { Sider, Content } = Layout;

  const onView = () => {
    setDrawerVisible(true);
  };

  const siderStyle: React.CSSProperties = {
    paddingTop: 8,
    textAlign: 'center',
    backgroundColor: token.colorBgBase,
  };

  const layoutStyle = {
    borderRadius: 8,
    overflow: 'hidden',
    width: 'calc(100%)',
    minWidth: 'calc(100%)',
    maxWidth: 'calc(100%)',
    height: 'calc(100%)',
    minHeight: 'calc(100%)',
    maxHeight: 'calc(100%)',
  };

  return (
    <>
      {buttonType === 'icon' ? (
        <Tooltip title={<FormattedMessage id="pages.button.view" defaultMessage="View" />}>
          <Button shape="circle" icon={<ProfileOutlined />} size="small" onClick={onView} />
        </Tooltip>
      ) : (
        <Button onClick={onView}>
          <FormattedMessage id="pages.button.view" defaultMessage="View" />
        </Button>
      )}
      <Drawer
        title={
          <FormattedMessage id="pages.flow.model.drawer.title.view" defaultMessage="View Model" />
        }
        width="100%"
        closable={false}
        extra={
          <Button
            icon={<CloseOutlined />}
            style={{ border: 0 }}
            onClick={() => {
              setDrawerVisible(false);
            }}
          />
        }
        maskClosable={true}
        open={drawerVisible}
        onClose={() => {
          setDrawerVisible(false);
        }}
      >
        <XFlow>
          <Layout style={layoutStyle}>
            <Layout>
              <Content>
                <XFlowGraph
                  zoomable
                  pannable
                  minScale={0.5}
                  readonly={true}
                  connectionOptions={{
                    router: {
                      name: 'manhattan',
                    },
                    connector: {
                      name: 'rounded',
                    },
                  }}
                />
                <Grid
                  type="dot"
                  options={{
                    color: '#595959',
                    thickness: 1,
                  }}
                />
              </Content>
            </Layout>
            <Sider width="50px" style={siderStyle}>
              <Toolbar
                id={id}
                version={version}
                lang={lang}
                drawerVisible={drawerVisible}
                isSave={true}
                setIsSave={() => {}}
                action={'view'}
              />
            </Sider>
          </Layout>
        </XFlow>
      </Drawer>
    </>
  );
};

export default LifeCycleModelView;
