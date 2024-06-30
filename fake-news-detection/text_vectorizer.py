from sklearn.feature_extraction.text import TfidfVectorizer
import joblib

class TextVectorizer:
    def __init__(self, max_df=0.7, stop_words="english"):
        self.vectorizer = TfidfVectorizer(max_df=max_df, stop_words=stop_words)

    def fit_transform(self, X_train):
        return self.vectorizer.fit_transform(X_train)

    def transform(self, X):
        return self.vectorizer.transform(X)

    def save(self, filepath):
        joblib.dump(self.vectorizer, filepath)

    def load(self, filepath):
        self.vectorizer = joblib.load(filepath)
