const lambda = require('../index');

describe('urlParser function', () => {
    const badCases = [[], {}, false, NaN];

    it('should return an empty array when provided a string that is not a url', () => {
        expect(lambda.urlParser("nashville,tennessee")).toEqual([]);
    })

    it('should return ["kamranahmedse", "developer-roadmap"] when provided https://github.com/kamranahmedse/developer-roadmap', () => {
        expect(lambda.urlParser("https://www.github.com/kamranahmedse/developer-roadmap")).toEqual(["kamranahmedse", "developer-roadmap"])
    })
    
    test.each(badCases)(
        'should return an empty array when provided a value that is not an array', val => {
            const badVal = lambda.urlParser(val);
            expect(badVal).toEqual([])
        }
    )
})


