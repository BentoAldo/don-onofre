import React from 'react';
import {expect} from 'chai';
import Header from './index';
import {describe, it} from "node:test";

describe('Spec Header', function () {
    it('it exists', () => {
        expect(Header).to.be.ok;
    });
});
