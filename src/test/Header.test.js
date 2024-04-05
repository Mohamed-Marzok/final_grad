import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from '../redux/store';
import Header from "../components/Header";


describe('testing header component',()=>{
    test('clicking on hamburger menu toggles sidebar', () => {
        render(
          <Provider store={store}>
            <Router>
              <Header />
            </Router>
          </Provider>
        );
        const logo = screen.getByAltText("navlogo..");
        expect(logo).toBeInTheDocument();   
       
    })

    test('clicking on login button dispatches action to show login form', async () => {
        render(
          <Provider store={store}>
            <Router>
              <Header />
            </Router>
          </Provider>
        );
    
        const loginButton = screen.getByText('Login');
        expect(loginButton).toBeInTheDocument();
    
        fireEvent.click(loginButton);
        const sign = screen.getByRole('button');
        expect(sign).toBeInTheDocument();
    
      });
      test('testing header ul link',()=>{
        render(
            <Provider store={store}>
              <Router>
                <Header />
              </Router>
            </Provider>
          );
        const home = screen.getByText('Home');
        const contact = screen.getByText('Contact');
        const aboutUs = screen.getByText('About Us');

        expect(home).toBeInTheDocument();
        expect(contact).toBeInTheDocument();
        expect(aboutUs).toBeInTheDocument();
      });

})