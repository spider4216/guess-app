module.exports = {
	entry: './jsx/index.jsx',
	mode: 'development',
	output: {
		path: __dirname + '/build/',
		filename: 'bundle.js'
	},
	stats: {
		colors: true,
		reasons: true
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.ttf$/,
				use: ['file-loader'],
			},
			{
				test: /\.jsx$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/react']
					}
				}
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		]
	}
}