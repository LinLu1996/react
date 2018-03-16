import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, Tree, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip, Row, Col,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import TechTree from '../../components/Tech';
// import TechTree from '../../components/Tech/TechTree';
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { TreeNode } = Tree;
//({ loading, tech })相当于connect里面的第一个参数mapstatetoprops，{}里面是整个state里面的一部分，整个state是以各个模块命名空间为属性的对象
@connect(({ loading, tech }) => ({
  submitting: loading.effects['form/submitRegularForm'],
  treeData: tech.treeData,
}))
@Form.create()
export default class BasicForms extends PureComponent {
  state = {
    parentId: null,
    cont: null,
  }
  componentWillMount() {
    this.props.dispatch({
      type: 'tech/init',
    });
  }
  onSelect = (selectedKeys, e) => {
    if (e.selected) {
      console.log(selectedKeys);
      //selectedKeys是当前被选中的树的key
      let cid = selectedKeys[selectedKeys.length - 1];
      console.log(cid);
      let title = e.node.props.title;
      this.setState({
        parentId: cid,
        cont: title,
      })
    } else {
      this.setState({
        parentId: null,
        cont: null,
      })
    };
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      let payload = null;
      if (this.state.parentId) {
        payload = {
          id: this.state.parentId,
          child: values
        }
      }
      if (!err) {
        this.props.dispatch({
          type: 'tech/add',
          payload: payload ? payload : values,
        });
        this.props.form.resetFields();
      }
    });
  };
  render() {
    const { submitting } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    const { treeData } = this.props;
    console.log(111);
    console.log(treeData);
    const root = this.props.root;
    return (
      <PageHeaderLayout title="基础表单">
        <Card bordered={false}>
          <Row gutter={30}>
            <Col xs={24} sm={6}>
              {treeData.length > 0 ?
                <Tree onSelect={this.onSelect}>
                  {TechTree(treeData)}
                </Tree>
                : 'loading tree'
              }
            </Col>
            <Col xs={24} sm={18}>
              <Card bordered={false}>
                <Tooltip>
                  {this.state.cont ? this.state.cont : ''}
                </Tooltip>
                <Form
                  onSubmit={this.handleSubmit}
                  hideRequiredMark
                  style={{ marginTop: 8 }}
                >
                  <FormItem
                    {...formItemLayout}
                    label="标题"
                  >
                    {getFieldDecorator('title', {
                      rules: [{
                        required: true, message: '请输入技术',
                      }],
                    })(
                      <Input placeholder="给目标起个名字" />
                      )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="目标描述"
                  >
                    {getFieldDecorator('desc', {
                      rules: [{
                        required: true, message: '请输入目标描述',
                      }],
                    })(
                      <TextArea style={{ minHeight: 32 }} placeholder="请输入你的技术内容" rows={4} />
                      )}
                  </FormItem>
                  <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                    <Button type="primary" htmlType="submit" loading={submitting}>
                      提交
                    </Button>
                    <Button style={{ marginLeft: 8 }}>保存</Button>
                  </FormItem>
                </Form>
              </Card>
            </Col>
          </Row>
        </Card>
      </PageHeaderLayout>
    );
  }
}
