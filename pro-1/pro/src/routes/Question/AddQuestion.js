import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, Tabs, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './style.less';
import AddQuestion1 from './AddQuestion1';
import AddQuestion2 from './AddQuestion2';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
export default class BasicForms extends PureComponent {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'question/add',
          payload: values,
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
    }
    return (
      <PageHeaderLayout title="基础表单" content="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。">
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="选择题" key="1">
            <AddQuestion1 />
          </TabPane>
          <TabPane tab="问答题" key="2">
            <AddQuestion2 />
          </TabPane>
        </Tabs>
      </PageHeaderLayout>
    );
  }
}
