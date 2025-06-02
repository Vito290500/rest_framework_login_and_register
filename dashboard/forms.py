"""
Forms personalization
"""
from django import forms

class LoginForm(forms.Form):
    username = forms.CharField(label="Username")
    password = forms.CharField(widget=forms.PasswordInput, label="Password")

class RegisterForm(forms.Form):
    username = forms.CharField(label="Username")
    email = forms.EmailField(label="E-mail")
    password = forms.CharField(widget=forms.PasswordInput, label="Password")
    