import joblib
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import LinearSVC
import os.path

class FakeNewsDetection:
    def __init__(self):
        # File paths for data, model, and vectorizer
        self.data_filepath = "C:\\Users\\boanc\\simple-ml-projects\\portofolio\\backend\\fake_news_detection\\data\\fake_or_real_news.csv"
        self.classifier_filepath = 'C:\\Users\\boanc\\simple-ml-projects\\portofolio\\backend\\fake_news_detection\\model\\fake_news_classifier.pkl'
        self.vectorizer_filepath = 'C:\\Users\\boanc\\simple-ml-projects\\portofolio\\backend\\fake_news_detection\\model\\tfidf_vectorizer.pkl'
        self.load()

        
    def load(self):
        if self.is_model_existing():
            self.load_models()
        else:
            self.data = pd.read_csv(self.data_filepath)
            self.data['fake'] = self.data['label'].apply(lambda x: 0 if x == "REAL" else 1)
            self.train()
            
    def is_model_existing(self):
        return os.path.exists(self.classifier_filepath) and os.path.exists(self.vectorizer_filepath)
    
    def load_models(self):
        self.classifier = joblib.load(self.classifier_filepath)
        self.vectorizer = joblib.load(self.vectorizer_filepath)
    
    def save_models(self):
        joblib.dump(self.classifier, self.classifier_filepath)
        joblib.dump(self.vectorizer, self.vectorizer_filepath)
        
    def train(self):
        self.X, self.y = self.data['text'], self.data['fake']
        self.X_train, self.X_test, self.y_train, self.y_test = train_test_split(self.X, self.y, test_size=0.2)

        self.vectorizer = TfidfVectorizer(stop_words="english", max_df=0.7)

        self.X_train_vectorized = self.vectorizer.fit_transform(self.X_train)
        self.X_test_vectorized = self.vectorizer.transform(self.X_test)
        
        self.classifier = LinearSVC()
        self.classifier.fit(self.X_train_vectorized, self.y_train)
        self.save_models()
    
    def vectorize_text(self, text):
        return self.vectorizer.transform([text])
    
    def get_score(self):
        return self.classifier.score(self.X_test_vectorized, self.y_test)
        
    def detect(self, text):
        vectorized_text = self.vectorize_text(text)
        prediction = self.classifier.predict(vectorized_text)
        return False if prediction == [1] else True