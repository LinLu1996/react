import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, Tabs, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip,
} from 'antd';
import { routerRedux, Link } from 'dva/router';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ loading,paper }) => ({
  submitting: loading.effects['form/submitRegularForm'],
  paper,
}))
@Form.create()
export default class addQuestion1 extends PureComponent {
  componentWillReceiveProps(nextProps) {
    if (nextProps.paper.status === 'ok') {
      this.props.dispatch(routerRedux.push({
        pathname: '/paper/paperList'
      }));
      nextProps.paper.status = '';
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'paper/add',
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
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
            </Button>
              <Button style={{ marginLeft: 8 }}>保存</Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
