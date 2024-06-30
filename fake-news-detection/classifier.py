from sklearn.svm import LinearSVC
import joblib

class Classifier:
    def __init__(self):
        self.model = LinearSVC()

    def train(self, X_train, y_train):
        self.model.fit(X_train, y_train)

    def predict(self, X):
        return self.model.predict(X)

    def score(self, X_test, y_test):
        score = self.model.score(X_test, y_test) * 100
        return "{:.2f}".format(score)

    def save(self, filepath):
        joblib.dump(self.model, filepath)

    def load(self, filepath):
        self.model = joblib.load(filepath)
