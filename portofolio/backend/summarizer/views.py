from django.http import JsonResponse
from rest_framework.decorators import api_view
from .summarizer import TextSummarizer

@api_view(['POST'])
def summarize_text(request):
    data = request.data
    text = data.get('text', '')

    summarizer = TextSummarizer()
    summary = summarizer.summarize(text)

    return JsonResponse({'summary': summary})
