const express = require('express');
const webpack = require('webpack');
const WebpackDevMiddleware = require('webpack-dev-middleware');
const WebpackHotMiddleware = require('webpack-hot-middleware');
const path = require('path');
const open = require('open');

const app = express();
const config = require('./webpack.config.js');
const compile = webpack(config);

import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router'
import configStore from './src/redux/configStore';
import App from './src/routes';

function renderFullPage(html, initialState) {
    return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
            </head>
            <body>
                <div id="root">
                <div>
                    ${html}
                </div>
                </div>
                <script>
                    window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
                </script>
                <script src="/bundle.js"></script>
            </body>
        </html>
    `;
}

app.use(WebpackDevMiddleware(compile, {
    publicPath: config.output.publicPath
}));

app.use(WebpackHotMiddleware(compile));

app.use(express.static('dist'));

app.get('*', (req, res) => {
    const state = {
        num: 1000
    };

    const store = configStore(state);

    Promise.all([
        store.dispatch({
            type: 'ADD'
        }),
        store.dispatch({
            type: 'ADD'
        })
    ])
    .then(() => {
        const context = {}
        const html = renderToString(
            <Provider store={ store }>
                <StaticRouter
                    location={req.url}
                    context={context}
                  >
                  <App></App>
                </StaticRouter>
            </Provider>
        );
        res.end(renderFullPage(html, store.getState()))
    })
});

app.listen(3000, () => {
    console.log('server is running at port 3000');
    open('http://localhost:3000')
});
