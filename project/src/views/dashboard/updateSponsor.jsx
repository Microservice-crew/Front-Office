import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const UpdateSponsorComponent = () => {
    const [sponsorData, setSponsorData] = useState({
        name: '',
        contactPerson: '',
        contactEmail: '',
        telephone: '',
    });

    const handleInputSponsor = (event) => {
        const { name, value } = event.target;
        setSponsorData({
            ...sponsorData,
            [name]: value,
        });
    };

    const updateData = (event) => {
        event.preventDefault();
        console.log('Updated Sponsor Data:', sponsorData);
        // Include your logic for updating the sponsor data
    };

    return (
        <div id="content-page" className="content-page">
            <Container>
                <div style={{ marginBottom: '20px' }}>
                    <h1 style={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '10px' }}>Update Your Sponsor</h1>
                </div>
                <Form onSubmit={updateData}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            name="name"
                            type="text"
                            placeholder="Enter sponsor name"
                            required
                            onChange={handleInputSponsor}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="contactPerson">
                        <Form.Label>Contact Person</Form.Label>
                        <Form.Control
                            name="contactPerson"
                            type="text"
                            placeholder="Enter contact person's name"
                            required
                            onChange={handleInputSponsor}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="contactEmail">
                        <Form.Label>Contact Email</Form.Label>
                        <Form.Control
                            name="contactEmail"
                            type="email"
                            placeholder="Enter contact email"
                            required
                            onChange={handleInputSponsor}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="telephone">
                        <Form.Label>Telephone</Form.Label>
                        <Form.Control
                            name="telephone"
                            type="tel"
                            placeholder="Enter telephone number"
                            required
                            onChange={handleInputSponsor}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Update
                    </Button>
                </Form>
            </Container>
        </div>
    );
};

export default UpdateSponsorComponent;
