import React from 'react';
import Multimedia from './multimedia.component';

import { cleanup } from 'react-testing-library';
import { shallow } from 'enzyme';

import  Enzyme from 'enzyme';
import  Adapter  from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

afterAll(cleanup);

const files = [
    { '@id': "https://live.staticflickr.com/4026/4394622693_f7daebe11f_b.jpg" },
    { '@id': "https://alejandroleon98.github.io/multi/file3.zip" },
    { '@id': "https://live.staticflickr.com/65535/49693057273_67d37d186b_b.jpg" }
];

const no_files = [];

describe.only('Multimedia', () => {

    const container = shallow( <Multimedia {...{ files, onUpload: () => undefined, editable: true }} /> );

    it('renders without crashing', () => {
        expect(container).toBeTruthy();
    });

    it("shows all files", () => {
        expect(container.find(".file-container")).toHaveLength(3);  

        expect(container.find(".image-container")).toHaveLength(2);   
        expect(container.find("#image-0")).toHaveLength(1);  
        expect(container.find("#image-2")).toHaveLength(1);  

        expect(container.find(".link-container")).toHaveLength(1);   
        expect(container.find("#file-1")).toHaveLength(1);  
        expect(container.find("#file-1").text().includes(".zip")).toBe(true);    
    });

    it("shows a message if there are no files", () => {
        const noFilesContainer = shallow( <Multimedia {...{ no_files, onUpload: () => undefined, editable: true }} /> );
        
        expect(noFilesContainer.find(".file-container")).toHaveLength(0);
        expect(noFilesContainer.find(".image-container")).toHaveLength(0);
        expect(noFilesContainer.find(".link-container")).toHaveLength(0);

        expect(noFilesContainer.find(".no-files")).toHaveLength(1);
    });

});