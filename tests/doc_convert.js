import fs from 'fs';
import {expect} from 'chai';

// Simple test example
describe('Doc converter', () => {

    describe('docx->pdf', () => {
      function increment(currentState) {
        return currentState + 1;
      }  
      it('converted', () => {
        let state = 42;
        let nextState = 43;  
        expect(nextState).to.equal(43);
        expect(state).to.equal(42);
      });  
    });

    describe('xlsx->pdf', () => {
        function increment(currentState) {
          return currentState + 1;
        }
        it('converted', () => {
          let state = 42;
          let nextState = 43;  
          expect(nextState).to.equal(43);
          expect(state).to.equal(42);
        });  
      });

      describe('html->pdf', () => {
        function increment(currentState) {
          return currentState + 1;
        }  
        it('converted', () => {
          let state = 42;
          let nextState = 43;  
          expect(nextState).to.equal(43);
          expect(state).to.equal(42);
        });  
      });
  });