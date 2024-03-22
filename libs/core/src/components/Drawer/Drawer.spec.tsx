import { fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import Drawer from './Drawer';

describe('@weavcraft/core/components/Drawer', () => {
  it('renders successfully', () => {
    const { getByTestId, queryByTestId } = render(<Drawer />);

    expect(getByTestId('Drawer')).toBeInTheDocument();
    expect(getByTestId('DrawerToggle')).toBeInTheDocument();
    expect(getByTestId('Content')).toBeInTheDocument();
    expect(getByTestId('Icon_faBars')).toBeInTheDocument();
    expect(queryByTestId('DrawerContent')).not.toBeInTheDocument();
  });

  it('should open the drawer when the toggle is clicked', () => {
    const { getByTestId, queryByTestId } = render(<Drawer />);
    const toggle = getByTestId('DrawerToggle');

    fireEvent.click(toggle);
    expect(toggle).not.toBeInTheDocument();
    expect(queryByTestId('DrawerContent')).toBeInTheDocument();
  });

  it('should close the drawer when the close button is clicked', () => {
    const { getByTestId, queryByTestId } = render(<Drawer />);

    fireEvent.click(getByTestId('DrawerToggle'));
    fireEvent.click(getByTestId('DrawerClose'));
    expect(queryByTestId('DrawerContent')).not.toBeInTheDocument();
  });

  it('should close the drawer when the user clicks away', async () => {
    const { getByTestId, queryByTestId } = render(<Drawer />);
    const toggle = getByTestId('DrawerToggle');

    fireEvent.click(toggle);

    await waitFor(() => {
      fireEvent.click(getByTestId('Content'));
      expect(queryByTestId('DrawerContent')).not.toBeInTheDocument();
    });
  });

  it('should render the correct button when the anchor is left', () => {
    const { getByTestId } = render(<Drawer anchor="left" />);
    const toggle = getByTestId('DrawerToggle');

    expect(getByTestId('DrawerContainer')).toHaveStyle('flex-direction: row;');
    expect(getByTestId('Toolbar').firstChild).toBe(toggle);
    fireEvent.click(toggle);
    expect(getByTestId('Icon_faAngleLeft')).toBeInTheDocument();

    expect(getByTestId('DrawerHeader').lastChild).toBe(
      getByTestId('DrawerClose')
    );
  });

  it('should render the correct button when the anchor is right', () => {
    const { getByTestId } = render(<Drawer anchor="right" />);
    const toggle = getByTestId('DrawerToggle');

    expect(getByTestId('DrawerContainer')).toHaveStyle(
      'flex-direction: row-reverse;'
    );

    expect(getByTestId('ContentHeader').lastChild).toBe(toggle);
    fireEvent.click(toggle);
    expect(getByTestId('Icon_faAngleRight')).toBeInTheDocument();

    expect(getByTestId('DrawerHeader').firstChild).toBe(
      getByTestId('DrawerClose')
    );
  });

  it('should switch the icon on toggle button', () => {
    const { getByTestId } = render(<Drawer headerIcon="faGithub" />);
    const toggle = getByTestId('DrawerToggle');

    expect(getByTestId('Icon_faGithub')).toBeInTheDocument();
    fireEvent.mouseOver(toggle);
    expect(getByTestId('Icon_faBars')).toBeInTheDocument();
  });
});
