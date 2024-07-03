import nltk
import re
from nltk.corpus import stopwords
from nltk.tokenize import sent_tokenize, word_tokenize
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
import numpy as np

nltk.download('punkt')
nltk.download('stopwords')

def preprocess_text(text):
    # Tokenize into sentences
    sentences = sent_tokenize(text)
    
    # Clean and tokenize each sentence
    cleaned_sentences = []
    for sentence in sentences:
        # Remove non-alphabetic characters and convert to lowercase
        cleaned_sentence = re.sub(r'[^a-zA-Z\s]', '', sentence).lower()
        cleaned_sentences.append(cleaned_sentence)
    
    return sentences, cleaned_sentences

def compute_tfidf(sentences):
    vectorizer = TfidfVectorizer(stop_words=stopwords.words('italian'))
    tfidf_matrix = vectorizer.fit_transform(sentences)
    return tfidf_matrix

def cluster_sentences(tfidf_matrix, num_clusters):
    kmeans = KMeans(n_clusters=num_clusters)
    kmeans.fit(tfidf_matrix)
    
    # Get cluster assignments for each sentence
    clusters = kmeans.labels_
    return clusters

def extract_summary(original_sentences, tfidf_matrix, clusters, num_sentences):
    summary_sentences = []
    unique_clusters = np.unique(clusters)
    
    for cluster in unique_clusters:
        cluster_indices = np.where(clusters == cluster)[0]
        if len(cluster_indices) == 0:
            continue
        
        # Find the sentence in the cluster with the highest TF-IDF score
        cluster_sentences = tfidf_matrix[cluster_indices]
        sentence_scores = cluster_sentences.sum(axis=1)
        top_sentence_index = cluster_indices[sentence_scores.argmax()]
        summary_sentences.append(original_sentences[top_sentence_index])
    
    # Sort summary sentences in their original order
    summary_sentences.sort(key=lambda s: original_sentences.index(s))
    return " ".join(summary_sentences[:num_sentences])

def generate_summary(text, num_sentences=5):
    original_sentences, cleaned_sentences = preprocess_text(text)
    tfidf_matrix = compute_tfidf(cleaned_sentences)
    num_clusters = min(num_sentences, len(original_sentences))
    clusters = cluster_sentences(tfidf_matrix, num_clusters)
    summary = extract_summary(original_sentences, tfidf_matrix, clusters, num_sentences)
    return summary

if __name__ == "__main__":
    text = input("Input text: ")
    summary = generate_summary(text)
    print("Summary:\n", summary)
