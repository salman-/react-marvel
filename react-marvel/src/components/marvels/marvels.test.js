import { render, screen } from '@testing-library/react';
import Marvels from './marvels';

describe('the landing page', () => {

    it('Contains list of marvels', () => {
        render(<Marvels />);
        const element = screen.getByTestId('marvelId-1');
        expect(element).toBeInTheDocument();
    });

    it('Each marvel has an image and a name', () => {
        render(<Marvels />);

        let element = screen.getByTestId('marvel-image-12');
        expect(element).toBeInTheDocument();
        element = screen.getByTestId('marvel-name-12');
        expect(element).toBeInTheDocument();

    })

});