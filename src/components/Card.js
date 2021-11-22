import React from 'react';
import './Card.css';
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

export const CardComponent = ({ children }) => <Card className="card" variant="outlined">
                                        <CardContent>{children}</CardContent>
                                       </Card>