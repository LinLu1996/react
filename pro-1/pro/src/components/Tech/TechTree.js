import React, { Component } from 'react';
import { connect } from 'dva';
import { Tree } from 'antd';
const { TreeNode } = Tree;
function toNode({ root, upkey }) {
    upkey = upkey ? upkey + '-' : '';
    if(root){
        return root.map(data => {
            let children = null;
            let curkey = upkey + data.id;
            if (data.children) {
                children = toNode(data.children, curkey);
            }
            return <TreeNode title={data.title} key={curkey}>{children}</TreeNode>
        })
    }
}
@connect(({ tech }) => ({
    treeData: tech.treeData
}))
class TechTree extends Component {
    componentDidMount() {
        (!this.props.treeData || !this.props.treeData.length) && this.props.dispatch({
            type: 'tech/init'
        });
    };
    // console.log(this.props.treeData);
    render() {
        let children = toNode(this.props.treeData);
        return (
            <Tree onSelect={this.props.onSelect}>
                {children}
            </Tree>
        )
    }
}
export default TechTree;

