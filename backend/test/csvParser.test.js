/* global describe, it */
const { expect } = require('chai');
const { parseCSV } = require('../src/utils/csvParser');

describe('CSV Parser', () => {
  describe('Valid CSV Parsing', () => {
    it('should parse valid CSV with multiple lines', () => {
      const csvContent = `file,text,number,hex
file1.csv,RgTya,64075909,70ad29aacf0b690b0467fe2b2767f765
file1.csv,AtjW,6,d33a8ca5d36d3106219f66f939774cf5`;

      const result = parseCSV(csvContent, 'file1.csv');

      expect(result).to.be.an('object');
      expect(result.file).to.equal('file1.csv');
      expect(result.lines).to.be.an('array');
      expect(result.lines).to.have.lengthOf(2);
    });

    it('should extract columns correctly', () => {
      const csvContent = `file,text,number,hex
file1.csv,TestText,12345,abcdef1234567890abcdef1234567890`;

      const result = parseCSV(csvContent, 'file1.csv');

      expect(result.lines[0]).to.deep.equal({
        text: 'TestText',
        number: 12345,
        hex: 'abcdef1234567890abcdef1234567890',
      });
    });

    it('should convert number column to numeric type', () => {
      const csvContent = `file,text,number,hex
file1.csv,Text,999,abcdef1234567890abcdef1234567890`;

      const result = parseCSV(csvContent, 'file1.csv');

      expect(result.lines[0].number).to.be.a('number');
      expect(result.lines[0].number).to.equal(999);
    });

    it('should keep text and hex as strings', () => {
      const csvContent = `file,text,number,hex
file1.csv,MyText,100,abcdef1234567890abcdef1234567890`;

      const result = parseCSV(csvContent, 'file1.csv');

      expect(result.lines[0].text).to.be.a('string');
      expect(result.lines[0].hex).to.be.a('string');
    });
  });

  describe('Invalid Line Filtering', () => {
    it('should filter out lines with wrong column count', () => {
      const csvContent = `file,text,number,hex
file1.csv,valid,123,abcdef1234567890abcdef1234567890
file1.csv,too,few
file1.csv,too,many,columns,here,extra
file1.csv,valid2,456,fedcba0987654321fedcba0987654321`;

      const result = parseCSV(csvContent, 'file1.csv');

      expect(result.lines).to.have.lengthOf(2);
      expect(result.lines[0].text).to.equal('valid');
      expect(result.lines[1].text).to.equal('valid2');
    });

    it('should filter out lines with invalid numbers', () => {
      const csvContent = `file,text,number,hex
file1.csv,valid,123,abcdef1234567890abcdef1234567890
file1.csv,invalid,not-a-number,fedcba0987654321fedcba0987654321
file1.csv,valid2,789,12345678901234567890123456789012`;

      const result = parseCSV(csvContent, 'file1.csv');

      expect(result.lines).to.have.lengthOf(2);
      expect(result.lines[0].number).to.equal(123);
      expect(result.lines[1].number).to.equal(789);
    });

    it('should filter out lines with empty required fields', () => {
      const csvContent = `file,text,number,hex
file1.csv,valid,123,abcdef1234567890abcdef1234567890
file1.csv,,456,fedcba0987654321fedcba0987654321
file1.csv,text,789,
file1.csv,valid2,100,12345678901234567890123456789012`;

      const result = parseCSV(csvContent, 'file1.csv');

      expect(result.lines).to.have.lengthOf(2);
      expect(result.lines[0].text).to.equal('valid');
      expect(result.lines[1].text).to.equal('valid2');
    });

    it('should filter out lines with invalid hex length', () => {
      const csvContent = `file,text,number,hex
file1.csv,valid,123,abcdef1234567890abcdef1234567890
file1.csv,short,456,abc123
file1.csv,long,789,abcdef1234567890abcdef1234567890extra
file1.csv,valid2,100,12345678901234567890123456789012`;

      const result = parseCSV(csvContent, 'file1.csv');

      expect(result.lines).to.have.lengthOf(2);
      expect(result.lines[0].text).to.equal('valid');
      expect(result.lines[1].text).to.equal('valid2');
    });

    it('should continue processing after encountering invalid lines', () => {
      const csvContent = `file,text,number,hex
file1.csv,line1,100,abcdef1234567890abcdef1234567890
file1.csv,bad
file1.csv,line2,200,fedcba0987654321fedcba0987654321
file1.csv,bad,NaN,12345678901234567890123456789012
file1.csv,line3,300,11111111111111111111111111111111`;

      const result = parseCSV(csvContent, 'file1.csv');

      expect(result.lines).to.have.lengthOf(3);
      expect(result.lines[0].text).to.equal('line1');
      expect(result.lines[1].text).to.equal('line2');
      expect(result.lines[2].text).to.equal('line3');
    });
  });

  describe('Empty File Handling', () => {
    it('should return empty array for empty string', () => {
      const result = parseCSV('', 'empty.csv');

      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(0);
    });

    it('should return empty array for whitespace-only content', () => {
      const result = parseCSV('   \n  \n  ', 'whitespace.csv');

      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(0);
    });

    it('should return object with empty lines for file with only header', () => {
      const csvContent = 'file,text,number,hex';
      const result = parseCSV(csvContent, 'header-only.csv');

      expect(result).to.be.an('object');
      expect(result.file).to.equal('header-only.csv');
      expect(result.lines).to.be.an('array');
      expect(result.lines).to.have.lengthOf(0);
    });

    it('should return object with empty lines when all lines are invalid', () => {
      const csvContent = `file,text,number,hex
file1.csv,invalid,not-number,abcdef1234567890abcdef1234567890
file1.csv,bad
file1.csv,wrong,NaN,fedcba0987654321fedcba0987654321`;

      const result = parseCSV(csvContent, 'all-invalid.csv');

      expect(result).to.be.an('object');
      expect(result.file).to.equal('all-invalid.csv');
      expect(result.lines).to.be.an('array');
      expect(result.lines).to.have.lengthOf(0);
    });
  });

  describe('Header Row Handling', () => {
    it('should skip header row', () => {
      const csvContent = `file,text,number,hex
file1.csv,Data1,100,abcdef1234567890abcdef1234567890
file1.csv,Data2,200,fedcba0987654321fedcba0987654321`;

      const result = parseCSV(csvContent, 'file1.csv');

      expect(result.lines).to.have.lengthOf(2);
      expect(result.lines[0].text).to.equal('Data1');
    });

    it('should handle CSV without header', () => {
      const csvContent = `file1.csv,Data1,100,abcdef1234567890abcdef1234567890
file1.csv,Data2,200,fedcba0987654321fedcba0987654321`;

      const result = parseCSV(csvContent, 'file1.csv');

      expect(result.lines).to.have.lengthOf(2);
      expect(result.lines[0].text).to.equal('Data1');
    });

    it('should detect header case-insensitively', () => {
      const csvContent = `FILE,TEXT,NUMBER,HEX
file1.csv,Data1,100,abcdef1234567890abcdef1234567890`;

      const result = parseCSV(csvContent, 'file1.csv');

      expect(result.lines).to.have.lengthOf(1);
      expect(result.lines[0].text).to.equal('Data1');
    });
  });

  describe('Data Type Validation', () => {
    it('should convert valid integers', () => {
      const csvContent = `file,text,number,hex
file1.csv,Text,42,abcdef1234567890abcdef1234567890`;

      const result = parseCSV(csvContent, 'file1.csv');

      expect(result.lines[0].number).to.equal(42);
      expect(typeof result.lines[0].number).to.equal('number');
    });

    it('should convert valid decimals', () => {
      const csvContent = `file,text,number,hex
file1.csv,Text,3.14,abcdef1234567890abcdef1234567890`;

      const result = parseCSV(csvContent, 'file1.csv');

      expect(result.lines[0].number).to.equal(3.14);
    });

    it('should filter lines with non-numeric values', () => {
      const csvContent = `file,text,number,hex
file1.csv,Text,abc,abcdef1234567890abcdef1234567890
file1.csv,Text,123abc,fedcba0987654321fedcba0987654321
file1.csv,Text,456,12345678901234567890123456789012`;

      const result = parseCSV(csvContent, 'file1.csv');

      expect(result.lines).to.have.lengthOf(1);
      expect(result.lines[0].number).to.equal(456);
    });
  });

  describe('Edge Cases', () => {
    it('should handle single valid line', () => {
      const csvContent = `file,text,number,hex
file1.csv,OnlyLine,999,abcdef1234567890abcdef1234567890`;

      const result = parseCSV(csvContent, 'file1.csv');

      expect(result.lines).to.have.lengthOf(1);
      expect(result.lines[0].text).to.equal('OnlyLine');
    });

    it('should handle mixed valid and invalid lines', () => {
      const csvContent = `file,text,number,hex
file1.csv,valid1,100,abcdef1234567890abcdef1234567890
file1.csv,invalid
file1.csv,valid2,200,fedcba0987654321fedcba0987654321
file1.csv,invalid,bad,12345678901234567890123456789012
file1.csv,valid3,300,11111111111111111111111111111111`;

      const result = parseCSV(csvContent, 'file1.csv');

      expect(result.lines).to.have.lengthOf(3);
    });

    it('should handle different newline formats', () => {
      const csvContent =
        'file,text,number,hex\r\nfile1.csv,Line1,100,abcdef1234567890abcdef1234567890\rfile1.csv,Line2,200,fedcba0987654321fedcba0987654321\nfile1.csv,Line3,300,12345678901234567890123456789012';

      const result = parseCSV(csvContent, 'file1.csv');

      expect(result.lines).to.have.lengthOf(3);
    });

    it('should return consistent format for all scenarios', () => {
      const validCSV = `file,text,number,hex
file1.csv,Data,100,abcdef1234567890abcdef1234567890`;
      const emptyCSV = '';
      const headerOnlyCSV = 'file,text,number,hex';

      const result1 = parseCSV(validCSV, 'file1.csv');
      const result2 = parseCSV(emptyCSV, 'file2.csv');
      const result3 = parseCSV(headerOnlyCSV, 'file3.csv');

      expect(result1).to.have.property('file');
      expect(result1).to.have.property('lines');
      expect(result2).to.be.an('array');
      expect(result3).to.have.property('file');
      expect(result3).to.have.property('lines');
    });
  });
});
