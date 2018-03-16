import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, Row, Col, Tree, Tabs, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, List, Tooltip,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import TechTree from '../../components/Tech';
import Papers from '../../components/Tech/Papers';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ loading, tech, question }) => ({
  submitting: loading.effects['form/submitRegularForm'],
  treeData: tech.treeData,
  questions: question.questions,
}))
@Form.create()
export default class addQuestion1 extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'tech/init',
    });
  }
  onSelect = (selectedKeys, e) => {
    if (e.selected) {
      this.props.dispatch({
        type: 'question/queryQuestion',
        payload: {
          types: selectedKeys[0],
        }
      })
    }
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
    const { treeData, questions } = this.props;
    console.log(treeData);
    console.log(questions);
    return (
      <PageHeaderLayout title="设置试卷" content="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。">
        <Card bordered={false}>
          <Row gutter={30}>
            <Col xs={24} sm={6}>
              {treeData ?
                <Tree onSelect={this.onSelect}>
                  {TechTree(treeData)}
                </Tree>
                : 'loading tree'
              }
            </Col>
            <Col xs={24} sm={18}>
              <Papers questions={questions} />
            </Col>
          </Row>
        </Card>

      </PageHeaderLayout>
    );
  }
}
