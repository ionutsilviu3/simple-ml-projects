import re
import numpy as np
from nltk.corpus import stopwords
from nltk.tokenize import sent_tokenize
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
from math import ceil

import nltk
nltk.download('punkt')
nltk.download('stopwords')


class TextSummarizer:
    def __init__(self):
        self.stop_words = set(stopwords.words('english'))

    def preprocess_text(self, text):
        sentences = sent_tokenize(text)
        cleaned_sentences = [
            re.sub(r'[^a-zA-Z\s]', '', sentence).lower().strip()
            for sentence in sentences
        ]
        return sentences, cleaned_sentences

    def compute_tfidf(self, sentences):
        vectorizer = TfidfVectorizer(stop_words=list(self.stop_words))
        tfidf_matrix = vectorizer.fit_transform(sentences)
        return tfidf_matrix

    def cluster_sentences(self, tfidf_matrix, num_clusters):
        kmeans = KMeans(n_clusters=num_clusters)
        kmeans.fit(tfidf_matrix)
        clusters = kmeans.labels_
        return clusters

    def extract_summary(self, original_sentences, tfidf_matrix, clusters, num_sentences):
        summary_sentences = []
        unique_clusters = np.unique(clusters)

        for cluster in unique_clusters:
            cluster_indices = np.where(clusters == cluster)[0]
            if len(cluster_indices) == 0:
                continue

            cluster_sentences = tfidf_matrix[cluster_indices]
            sentence_scores = cluster_sentences.sum(axis=1)
            top_sentence_index = cluster_indices[sentence_scores.argmax()]
            summary_sentences.append(original_sentences[top_sentence_index])

        summary_sentences.sort(key=lambda s: original_sentences.index(s))
        return " ".join(summary_sentences[:num_sentences])

    def summarize(self, text, num_sentences=None):
        original_sentences, cleaned_sentences = self.preprocess_text(text)
        tfidf_matrix = self.compute_tfidf(cleaned_sentences)
        
        if num_sentences is None:
            num_sentences = ceil(len(original_sentences) * 0.3) 
        
        num_clusters = min(num_sentences, len(original_sentences))
        clusters = self.cluster_sentences(tfidf_matrix, num_clusters)
        return self.extract_summary(original_sentences, tfidf_matrix, clusters, num_sentences)
