import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, Tabs, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './style.less';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
export default class addQuestion2 extends PureComponent {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      let payload={
        ...values,
        types:this.props.parentId
      }
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
    }
    return (
      <Card bordered={false}>
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
                required: true, message: '请输入标题',
              }],
            })(
              <Input placeholder="请输入标题" />
              )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="答案"
          >
            {getFieldDecorator('answer', {
              rules: [{
                required: true, message: '请输入答案',
              }],
            })(
              <TextArea style={{ minHeight: 32 }} placeholder="请输入答案" rows={2} />
              )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('type', {
              initialValue: "问答题"
            })(
              <Input type="hidden" />
              )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('types', {
              initialValue: "html"
            })(
              <Input type="hidden" />
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
    );
  }
}
