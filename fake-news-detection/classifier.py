from sklearn.svm import LinearSVC
import joblib

class Classifier:
    def __init__(self):
        # Initialize the Linear Support Vector Classifier
        self.model = LinearSVC()

    def train(self, X_train, y_train):
        # Train the classifier with the training data
        self.model.fit(X_train, y_train)

    def predict(self, X):
        # Predict labels for the given data
        return self.model.predict(X)

    def score(self, X_test, y_test):
        # Evaluate the model and return the accuracy
        return self.model.score(X_test, y_test)

    def save(self, filepath):
        # Save the trained model to a file
        joblib.dump(self.model, filepath)

    def load(self, filepath):
        # Load the trained model from a file
        self.model = joblib.load(filepath)
