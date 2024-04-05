import React from "react";
import {render , screen} from '@testing-library/react';
import Content from "../components/Content";

describe('testing hero content' ,() =>{
    test('renders main heading and paragraphs', ()=>{
        render(<Content />);
        
        const mainHeading = screen.getByText(/Welcome to Our Website/i);
        const paragraph1 = screen.getByText(/Lorem ipsum/i);
        const paragraph2 = screen.getByText(/Sed condimentum diam/i);

        expect(mainHeading).toBeInTheDocument();
        expect(paragraph1).toBeInTheDocument();
        expect(paragraph2).toBeInTheDocument();
    })
})