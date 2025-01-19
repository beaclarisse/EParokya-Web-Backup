// NavigationForm.js
import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavigationForm = () => {
    const formCategories = [
        {
            title: 'Private Forms',
            forms: [
                { name: 'Priavate Wedding', path: '/user/weddingForm' },
                { name: 'Private Baptism', path: '/user/baptismForm' },
                { name: 'Private Funeral', path: '/user/funeralForm' },
                { name: 'Counseling', path: '/user/counselingForm' },
            ],
        },
        {
            title: 'Mass Forms',
            forms: [
                { name: 'Kasalang Bayan', path: '/forms/mass/mass-wedding' },
                { name: 'Binyagang Bayan', path: '/forms/mass/mass-baptism' },
                { name: 'Kumpil', path: '/forms/mass/mass-funeral' },
            ],
        },
    ];

    return (
        <div className="container mt-5">
            <h2>Forms Navigation</h2>
            {formCategories.map((category, index) => (
                <div key={index} className="mt-4">
                    <h4>{category.title}</h4>
                    <Row>
                        {category.forms.map((form, idx) => (
                            <Col md={4} key={idx} className="mb-3">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{form.name}</Card.Title>
                                        <Link to={form.path} className="btn btn-primary">
                                            Go to {form.name}
                                        </Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            ))}
        </div>
    );
};

export default NavigationForm;
