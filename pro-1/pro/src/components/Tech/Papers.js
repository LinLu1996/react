import React, { Component } from 'react';
import { List, Row, Col, Input,Form,Button } from 'antd';
export default function Papers({ questions }) {
    console.log(questions.选择题);
    let xuanze = questions.选择题 && questions.选择题.map(item => {
        return <List.Item>
            <Row>
                <Col xs={8}>{item.id}</Col>
                <Col xs={10}>{item.title}</Col>
                <Col xs={6}><Input type="checkbox" defaultValue={item.id} name="section"/></Col>
            </Row>
        </List.Item>
    });
    let wenda = questions.问答题 && questions.问答题.map(item =>{
        return <List.Item>
            <Row>
                <Col xs={4}>{item.id}</Col>
                <Col xs={16}>{item.title}</Col>
                <Col xs={4}><Input type="checkbox" defaultValue={item.id} name="section"/></Col>
            </Row>
        </List.Item>
    });
    return (
        <div>
            <List header={'选择题'}>              
                { xuanze }
            </List>
            <List header={'问答题'}>
                { wenda }
            </List>
        </div>
    )
}