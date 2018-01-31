const express = require('express');
const o2x = require('object-to-xml');

function processQueryResult(rows) {
    let data = [];
    rows.forEach(element => {
        data.push(element);
    });
    return data;
}

function xml(data, res) {
    res.set('Content-Type', 'text/xml');
    res.send(o2x({
        '?xml version="1.0" encoding="utf-8"?': null,
        data
    }));
}

module.exports = {process: processQueryResult, xml: xml};