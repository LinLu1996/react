import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, Tabs, Tree, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip, Row, Col,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import TechTree from '../../components/Tech';
import AddQuestion1 from '../Question/AddQuestion1';
import AddQuestion2 from '../Question/AddQuestion2';
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { TreeNode } = Tree;
const TabPane = Tabs.TabPane;
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
  componentDidMount() {
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
      let payload = {
        ...values,
        types: this.state.parentId
      }
      console.log(payload);
      if (!err) {
        this.props.dispatch({
          type: 'question/add',
          payload
        });
        this.props.form.resetFields();
      }
    });
  }
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
    function callback(key) {
      console.log(key);
    };
    //这个参数key是tabs选项卡的每一项，可以通过这个值来得到当前题目的类型,给state添加一项type，作为参数传到子组件
    // function callback(key) {
    //   let type = "";
    //   switch (key) {
    //     case "1":
    //       type = "选择题";
    //       break;
    //     case "2":
    //       type = "问答题";      
    //       break;
    //   }
          // this.setState({
          //   type,
          // })
    // }
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
              <Tooltip>
                {this.state.cont ? this.state.cont : ''}
              </Tooltip>
              <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="选择题" key="1">
                  <AddQuestion1 parentId={this.state.parentId} />
                </TabPane>
                <TabPane tab="问答题" key="2">
                  <AddQuestion2 parentId={this.state.parentId} />
                </TabPane>
              </Tabs>
            </Col>
          </Row>
        </Card>
      </PageHeaderLayout>
    );
  }
}
