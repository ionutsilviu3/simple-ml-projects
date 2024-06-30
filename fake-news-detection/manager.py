import os

from classifier import Classifier
from data_handler import DataHandler
from text_vectorizer import TextVectorizer

class Manager:
    def __init__(self):
        data_filepath = "fake-news-detection/data/fake_or_real_news.csv"
        model_filepath = 'fake-news-detection/model/fake_news_classifier.pkl'
        vectorizer_filepath = 'fake-news-detection/model/tfidf_vectorizer.pkl'
        
        self.data_handler = DataHandler(data_filepath)
        self.vectorizer = TextVectorizer()
        self.classifier = Classifier()
        self.model_filepath = model_filepath
        self.vectorizer_filepath = vectorizer_filepath

    def check_model(self):
        return os.path.exists(self.model_filepath) and os.path.exists(self.vectorizer_filepath)

    def train_model(self):
        data = self.data_handler.load_data()
        X_train, X_test, y_train, y_test = self.data_handler.split_data()
        
        X_train_vectorized = self.vectorizer.fit_transform(X_train)
        X_test_vectorized = self.vectorizer.transform(X_test)

        self.classifier.train(X_train_vectorized, y_train)

        self.classifier.save(self.model_filepath)
        self.vectorizer.save(self.vectorizer_filepath)

        score = self.classifier.score(X_test_vectorized, y_test)
        print(f"Model accuracy: {score}%")

    def load_model(self):
        self.classifier.load(self.model_filepath)
        self.vectorizer.load(self.vectorizer_filepath)
        
    def run(self):
        if self.check_model():
            print("Loading existing model...")
            self.load_model()
        else:
            print("Training new model...")
            self.train_model()

        text = input("You have one shot, write something and I'll guess if it's fake or real! Write below: \n")
        vectorized_text = self.vectorizer.transform([text])
        prediction = self.classifier.predict(vectorized_text)
        
        if prediction == [1]:
            result = "FAKE NEWS."
        else:
            result = "THE TRUTH."
        
        print("\nHmm..I'm thinking that that is..", result)