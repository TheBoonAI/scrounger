import json

from django.contrib.auth.models import User
from django.test import TestCase, Client
from django.urls import reverse


class AuthTestCase(TestCase):

    def setUp(self):
        self.user = User.objects.create_user('user', 'user@fake.com', 'letmein',
                                             first_name='Faky', last_name='Fakerson')
        self.client = Client()

    def test_form_data(self):
        response = self.client.post(reverse('login'),
                                    {'username': 'user',
                                     'password': 'letmein'})
        self.assertEqual(response.status_code, 200)

    def test_json(self):
        response = self.client.post(reverse('login'),
                                    json.dumps({'username': 'user',
                                                'password': 'letmein'}),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 200)

    def test_inactive_user(self):
        user = User.objects.get(username='user')
        user.is_active = False
        user.save()

        response = self.client.post(reverse('login'),
                                    {'username': 'user',
                                     'password': 'letmein'})
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.json(), {'detail': 'No active user for the given '
                                                     'email/password combination found.'})

    def test_logout(self):
        self.assertTrue(self.client.login(username='user',
                                          password='letmein'))
        response = self.client.post(reverse('logout'))
        self.assertEqual(response.status_code, 200)

    def test_me_view(self):
        self.client.force_login(self.user)
        response = self.client.get(reverse('me'))
        self.assertEqual(response.status_code, 200)
        expected = {'firstName': self.user.first_name,
                    'lastName': self.user.last_name,
                    'username': self.user.username,
                    'email': self.user.email}
        self.assertEqual(json.loads(response.content), expected)
