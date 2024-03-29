import React from 'react';
import styled from 'styled-components';

const Login = () => {
  return (
    <Container>
      {/* Call to Action Box */}
      <CTA>
        <CTALogoOne src="/images/cta-logo-one.svg" />
        <SignUp>GET ALL THERE</SignUp>
        <Description>
          Get Premier Access to Raya and the Last Dragon for an additional fee
          with a Disney+ subscription. As of 03/26/21, price of Disney+ and the
          Disney Bundle will increase by $1.
        </Description>
        <CTALogoTwo src="/images/cta-logo-two.png" />
      </CTA>
    </Container>
  );
}

export default Login;


const Container = styled.div`
  position: relative;
  height: calc(100vh - 70px);
  display: flex;
  align-items: top;
  justify-content: center;

  &::before {
    content: "";
    background-image: url('/images/login-background.jpg');
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    opacity: 0.7;
  }
`;

const CTA = styled.div`
  width: 90%;
  max-width: 650px;
  padding: 80px 40px;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 60px;
`;

const CTALogoOne = styled.img``;

const SignUp = styled.a`
  width: 100%;
  background-color: #0063e5;
  font-weight: bold;
  padding: 17px 0;
  margin-top: 15px;
  margin-bottom: 5px;
  text-align: center;
  color: #f9f9f9;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
  transition: all 250ms;
  letter-spacing: 3px;

  &:hover {
    background-color: #0483ee;
  }
`;

const Description = styled.p`
  font-size: 11px;
  letter-spacing: 1.5px;
  text-align: center;
  line-height: 1.5;
`;

const CTALogoTwo = styled.img`
  width: 90%;
  padding: 5px;
`;
