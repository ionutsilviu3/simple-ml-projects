import json
from django.http import JsonResponse
from rest_framework.decorators import api_view
from .fake_news_detection import FakeNewsDetection

# Create your views here.
@api_view(['POST'])
def detect_fake_news(request):
    data = request.data
    text = data.get('text', '')

    fake_news_detector = FakeNewsDetection()
    detection = fake_news_detector.detect(text)
    detection = json.dumps(detection)
    return JsonResponse({'detection': detection})