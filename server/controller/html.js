'use strict';

const CONFIG = require('../config');

const fs = require('fs');

exports.create = (req, res) => {
    let data = req.body;
    let html = '';
    data.attributes.forEach(e => {
        if (e.type === 'checkbox' || e.type === 'radio') {
            let inner = '';
            e.values.forEach(i => {
                let b = `<label class="cust-check-bx">
                <input type="${e.type}" value="${i.value}" name="${e.name}"> ${i.label}
                <span class="checkmark"></span>
              </label>`
              inner = inner.concat(b)
            })
            let tag = `<div>
            <label>${e.label}</label>
            <div class="inline-form-group">
            ${inner}
            </div>
          </div>`
          html = html.concat(tag);
        }
        else if (e.type === 'autocomplete') {
            let inner = '';
            e.values.forEach(i => {
                let b = `<option value="${i.value}">${i.label}</option>`
              inner = inner.concat(b)
            })
            let tag = `<div>
            <label>${e.label}</label>
            <select class="form-control" id="${e.name}">
            ${inner}
            </select>
          </div>`
          html = html.concat(tag);
        } else if (e.type === 'button'){
            let tag = `<div>
                    <input type="${e.type}" class="form-control" id="${e.name}" value="${e.label}">
                </div>`
            html = html.concat(tag);
        } else {
            let tag = `<div>
                    <label>${e.label}</label>
                    <input type="${e.type}" class="form-control" id="${e.name}" placeholder="${e.label}" autocomplete="off">
                </div>`
            html = html.concat(tag);
        }
    })
    let dom = `<!DOCTYPE html>
                <html>
                    <head>
                        <title>FORM</title>
                    </head>
                    <body>
                        <h1>Form Builder</h1>
                        ${html}
                    </body>
                </html>`
    fs.writeFile(__dirname+'/index.html', dom, function (err) {
        if (err) throw err;
        res.status(201).json({link: 'http://localhost:3000/form'});
    });
}

