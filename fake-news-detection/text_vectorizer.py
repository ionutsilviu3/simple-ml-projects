from sklearn.feature_extraction.text import TfidfVectorizer
import joblib

class TextVectorizer:
    def __init__(self, max_df=0.7, stop_words="english"):
        # Initialize the TfidfVectorizer with specified parameters
        self.vectorizer = TfidfVectorizer(max_df=max_df, stop_words=stop_words)

    def fit_transform(self, X_train):
        # Fit the vectorizer to the training data and transform it
        return self.vectorizer.fit_transform(X_train)

    def transform(self, X):
        # Transform the data using the already fitted vectorizer
        return self.vectorizer.transform(X)

    def save(self, filepath):
        # Save the vectorizer to a file
        joblib.dump(self.vectorizer, filepath)

    def load(self, filepath):
        # Load the vectorizer from a file
        self.vectorizer = joblib.load(filepath)
