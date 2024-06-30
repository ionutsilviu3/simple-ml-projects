import pandas as pd
from sklearn.model_selection import train_test_split

class DataHandler:
    def __init__(self, filepath):
        self.filepath = filepath
        self.data = None

    def load_data(self):
        self.data = pd.read_csv(self.filepath)
        self.data['fake'] = self.data['label'].apply(lambda x: 0 if x == "REAL" else 1)
        return self.data

    def split_data(self, test_size=0.2):
        X, y = self.data['text'], self.data['fake']
        return train_test_split(X, y, test_size=test_size)
