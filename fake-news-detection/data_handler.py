import pandas as pd
from sklearn.model_selection import train_test_split

class DataHandler:
    def __init__(self, filepath):
        # Initialize with the file path to the dataset
        self.filepath = filepath
        self.data = None

    def load_data(self):
        # Load the data from a CSV file
        self.data = pd.read_csv(self.filepath)
        # Add a new column 'fake' based on the 'label' column
        self.data['fake'] = self.data['label'].apply(lambda x: 0 if x == "REAL" else 1)
        return self.data

    def split_data(self, test_size=0.2):
        # Split the data into features (X) and labels (y)
        X, y = self.data['text'], self.data['fake']
        # Split the dataset into training and testing sets
        return train_test_split(X, y, test_size=test_size)
