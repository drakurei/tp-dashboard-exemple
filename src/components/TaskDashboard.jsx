import React, { useState } from 'react'
import { Row, Col, Card, Form, Button } from 'react-bootstrap'

const priorityOptions = [
    { value: 'low', label: 'Basse', variant: 'success' },
    { value: 'medium', label: 'Moyenne', variant: 'warning' },
    { value: 'high', label: 'Haute', variant: 'danger' },
]

const initialFormData = {
    title: '',
    description: '',
    priority: 'low',
    done: false,
}

export default function TaskDashboard() {
    // Tâches par défaut, chacune avec un id unique (utilisé comme key dans le .map)
    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: 'Faire le devis du projet Automobile',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed velit velit, pulvinar sed venenatis sed, venenatis at velit. Ut scelerisque magna at dui viverra, ut rutrum velit porta.',
            priority: 'high',
            done: false,
        },
        {
            id: 2,
            title: 'Faire le slider du projet eShop',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed velit velit, pulvinar sed venenatis sed, venenatis at velit. Ut scelerisque magna at dui viverra, ut rutrum velit porta.',
            priority: 'low',
            done: true,
        },
        {
            id: 3,
            title: "Modifier le formulaire d'ajout produit du projet eShop",
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed velit velit, pulvinar sed venenatis sed, venenatis at velit. Ut scelerisque magna at dui viverra, ut rutrum velit porta.',
            priority: 'medium',
            done: false,
        },
        {
            id: 4,
            title: 'Créer la page de connexion du projet Banque',
            description: 'Formulaire email + mot de passe avec validation des champs et affichage des messages d\'erreur.',
            priority: 'high',
            done: false,
        },
        {
            id: 5,
            title: 'Rendre le site Restaurant responsive',
            description: 'Adapter le menu et la galerie photos pour mobile et tablette avec les breakpoints Bootstrap.',
            priority: 'medium',
            done: true,
        },
        {
            id: 6,
            title: 'Corriger les liens du footer du projet Blog',
            description: 'Vérifier que tous les liens du footer pointent vers les bonnes pages et ouvrir les réseaux sociaux dans un nouvel onglet.',
            priority: 'low',
            done: false,
        },
        {
            id: 7,
            title: 'Préparer la présentation du projet eShop',
            description: 'Faire 5 slides pour présenter les fonctionnalités principales au client : catalogue, panier et paiement.',
            priority: 'medium',
            done: false,
        },
    ])

    const [formData, setFormData] = useState(initialFormData)
    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        })
    }

    const handleSubmit = (e) => {
        // On bloque le rechargement de la page
        e.preventDefault()

        // Contrôles : le titre et la description ne doivent pas être vides
        const newErrors = {}
        if (formData.title.trim() === '') {
            newErrors.title = 'Le titre est obligatoire'
        }
        if (formData.description.trim() === '') {
            newErrors.description = 'La description est obligatoire'
        }

        setErrors(newErrors)

        // En cas d'erreur, on bloque la validation
        if (Object.keys(newErrors).length > 0) {
            return
        }

        // Pas d'erreur : on ajoute la tâche avec un nouvel id
        const newTask = {
            id: Date.now(),
            title: formData.title.trim(),
            description: formData.description.trim(),
            priority: formData.priority,
            done: formData.done,
        }
        setTasks([...tasks, newTask])

        // On vide le formulaire pour pouvoir créer une autre tâche
        setFormData(initialFormData)
    }

    // Clic sur le bouton de statut : on inverse done pour cette tâche
    const toggleDone = (id) => {
        setTasks(tasks.map((task) =>
            task.id === id ? { ...task, done: !task.done } : task
        ))
    }

    // Retrouve l'option de priorité (label + couleur) à partir de sa valeur
    const getPriority = (value) => {
        return priorityOptions.find((option) => option.value === value)
    }

    const doneCount = tasks.filter((task) => task.done).length

    return (
        <>
            <div className='mb-4'>
                <h1 className='mb-4'>Tableau de bord</h1>
                <p className='text-muted mb-0'>Tâches</p>
            </div>
            <Row className='g-4 mb-4'>
                <Col md={4}>
                    <Card className='shadow-sm border-0'>
                        <Card.Body>
                            <h2 className='h5'>Total</h2>
                            <p className='fs-2 mb-0'>{tasks.length}</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className='shadow-sm border-0'>
                        <Card.Body>
                            <h2 className='h5'>Terminées</h2>
                            <p className='fs-2 mb-0'>{doneCount}</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className='shadow-sm border-0'>
                        <Card.Body>
                            <h2 className='h5'>En cours</h2>
                            <p className='fs-2 mb-0'>{tasks.length - doneCount}</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className='g-4 mb-4'>
                <Col lg={4}>
                    <Card className='shadow-sm border-0'>
                        <Card.Body>
                            <Card.Title className='mb-4'>
                                Nouvelle tâche
                            </Card.Title>
                            <Form onSubmit={handleSubmit} noValidate>
                                <Form.Group className='mb-3'>
                                    <Form.Label>Titre</Form.Label>
                                    <Form.Control
                                        type='text'
                                        name='title'
                                        placeholder='Saisir un titre'
                                        value={formData.title}
                                        onChange={handleChange}
                                        isInvalid={!!errors.title}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        {errors.title}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className='mb-3'>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as='textarea'
                                        rows={4}
                                        name='description'
                                        placeholder='Saisir une description'
                                        value={formData.description}
                                        onChange={handleChange}
                                        isInvalid={!!errors.description}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        {errors.description}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className='mb-3'>
                                    <Form.Label>Priorité</Form.Label>
                                    <Form.Select
                                        name='priority'
                                        value={formData.priority}
                                        onChange={handleChange}
                                    >
                                        { priorityOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                { option.label }
                                            </option>
                                        )) }
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className='mb-3'>
                                    <Form.Check
                                        type='checkbox'
                                        id='done'
                                        label='Tâche terminée'
                                        name='done'
                                        checked={formData.done}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Button type='submit' variant='primary' className='w-100'>
                                    Ajouter la tâche
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={8}>
                    <Row className='g-3'>
                        { tasks.map((task) => (
                            <Col md={6} key={task.id}>
                                <Card className='shadow-sm border-0 h-100'>
                                    <Card.Body>
                                        <Card.Title>{task.title}</Card.Title>
                                        <Card.Text>{task.description}</Card.Text>
                                        <div className='d-flex justify-content-between'>
                                            <Button
                                                size='sm'
                                                variant={task.done ? 'light' : 'dark'}
                                                onClick={() => toggleDone(task.id)}
                                            >
                                                {task.done ? 'Terminée' : 'En cours'}
                                            </Button>
                                            <Button size='sm' variant={getPriority(task.priority).variant}>
                                                {getPriority(task.priority).label}
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )) }
                    </Row>
                </Col>
            </Row>
        </>
    )
}
