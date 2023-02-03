import React from 'react'
import {Row,Col} from 'react-bootstrap'
import { FooterContainer } from './Footer.styles'

const Footer = () => {
    return (
        <div>
        
            <FooterContainer>
                <Row>
                    <Col className='text-break py-2'> Copyright &copy; Housepital&Dietnation</Col>
                </Row>
            </FooterContainer>          
        </div>
    )
}

export default Footer
