import { Tree } from 'antd';
const { TreeNode } = Tree;
function toNode(root, upkey) {
    upkey = upkey ? upkey + '-' : '';
    return root.map(data => {
        let children = null;
        let curkey = upkey + data.id;
        if (data.children) {
            children = toNode(data.children, curkey);
        }
        return <TreeNode title={data.title} key={curkey}>{children}</TreeNode>
    })
}
export default toNode;
