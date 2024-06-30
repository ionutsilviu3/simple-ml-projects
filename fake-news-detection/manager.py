import os

from classifier import Classifier
from data_handler import DataHandler
from text_vectorizer import TextVectorizer

class Manager:
    def __init__(self):
        # File paths for data, model, and vectorizer
        data_filepath = "fake-news-detection/data/fake_or_real_news.csv"
        model_filepath = 'fake-news-detection/model/fake_news_classifier.pkl'
        vectorizer_filepath = 'fake-news-detection/model/tfidf_vectorizer.pkl'
        
        # Initialize components for data handling, vectorization, and classification
        self.data_handler = DataHandler(data_filepath)
        self.vectorizer = TextVectorizer()
        self.classifier = Classifier()
        self.model_filepath = model_filepath
        self.vectorizer_filepath = vectorizer_filepath

    def check_model(self):
        # Check if model and vectorizer files exist
        return os.path.exists(self.model_filepath) and os.path.exists(self.vectorizer_filepath)

    def train_model(self):
        # Load and split the data
        self.data_handler.load_data()
        X_train, X_test, y_train, y_test = self.data_handler.split_data()
        
        # Fit and transform the training data, transform the test data
        X_train_vectorized = self.vectorizer.fit_transform(X_train)
        X_test_vectorized = self.vectorizer.transform(X_test)

        # Train the classifier
        self.classifier.train(X_train_vectorized, y_train)

        # Save the trained model and vectorizer to disk
        self.classifier.save(self.model_filepath)
        self.vectorizer.save(self.vectorizer_filepath)

        # Evaluate the model and print the accuracy
        score = self.classifier.score(X_test_vectorized, y_test)
        print(f"Model accuracy: {score * 100}%")

    def load_model(self):
        # Load the saved model and vectorizer from disk
        self.classifier.load(self.model_filepath)
        self.vectorizer.load(self.vectorizer_filepath)
        
    def run(self):
        # Check if a saved model exists
        if self.check_model():
            print("Loading existing model...")
            self.load_model()
        else:
            print("Training new model...")
            self.train_model()

        # Get user input for prediction
        text = input("You have one shot, write something and I'll guess if it's fake or real! Write below: \n")
        
        # Transform the input text and make a prediction
        vectorized_text = self.vectorizer.transform([text])
        prediction = self.classifier.predict(vectorized_text)
        
        # Interpret and print the prediction result
        if prediction == [1]:
            result = "FAKE NEWS."
        else:
            result = "THE TRUTH."
        
        print("\nHmm..I'm thinking that that is..", result)
