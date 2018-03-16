import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, Tabs, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, List, Tooltip,
} from 'antd';
import { Link } from 'react-router-dom';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ loading, paper }) => ({
  submitting: loading.effects['form/submitRegularForm'],
  paperList: paper.paperList,
}))
@Form.create()
export default class addQuestion1 extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'paper/init',
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
    }
    const { paperList } = this.props;
    console.log(paperList);
    return (
      <PageHeaderLayout title="试卷列表" content="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。">
        <List
          size="small"
          header={<div>Header</div>}
          footer={<div>Footer</div>}
          bordered
          dataSource={paperList}
          renderItem={item => (
            <List.Item>
              <span>{item.title}</span>
              <Link to={{ pathname: "/paper/setup", query: { id: item.id } }}>设置考题</Link>
            </List.Item>)}
        />
      </PageHeaderLayout>
    );
  }
}
