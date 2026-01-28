import { visit } from 'unist-util-visit';
import { h } from 'hastscript';

export function remarkCalloutDirective() {
    return (tree: any) => {
        visit(tree, (node) => {
            if (
                node.type === 'containerDirective' ||
                node.type === 'leafDirective' ||
                node.type === 'textDirective'
            ) {
                if (['info', 'warning', 'success', 'error', 'note'].includes(node.name)) {
                    const data = node.data || (node.data = {});
                    const tagName = 'Callout';

                    data.hName = tagName;
                    data.hProperties = h(tagName, {
                        type: node.name,
                        title: node.attributes.title,
                    }).properties;
                }
            }
        });
    };
}
