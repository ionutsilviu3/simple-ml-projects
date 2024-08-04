from django.urls import path
from .views import detect_fake_news

urlpatterns = [
    path('fake-news-detection/', detect_fake_news, name='fake-news-detection'),
]
