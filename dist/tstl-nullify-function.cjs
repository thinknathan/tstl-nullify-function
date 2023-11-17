'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const ts = require('typescript');
const tstl = require('typescript-to-lua');
const inlineComment = '@nullify';
const plugin = {
	visitors: {
		[ts.SyntaxKind.FunctionDeclaration](node, context) {
			const result = context.superTransformStatements(node);
			// Check if the function has the comment
			const comments = ts.getLeadingCommentRanges(
				context.sourceFile.text,
				node.pos,
			);
			if (comments) {
				const comment = comments.find((comment) =>
					context.sourceFile.text
						.substring(comment.pos, comment.end)
						.includes(inlineComment),
				);
				if (comment) {
					// Add a new statement after the function that replaces it with nil
					const replacementStatement = tstl.createAssignmentStatement(
						tstl.createIdentifier(node.name.getText()),
						tstl.createNilLiteral(),
					);
					result.push(replacementStatement);
				}
			}
			return result;
		},
	},
};
exports.default = plugin;
