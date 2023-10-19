import csv
import matplotlib.pylab as plt
import pandas as pd
import numpy as np
from music21 import *
from midiutil.MidiFile import MIDIFile

g_csv_file = "Apple.csv"
g_size_of_vals = 300
g_beats_per_minute = 25

g_note_names = ['C1', 'C2', 'G2',
                'C3', 'E3', 'G3', 'A3', 'B3',
                'D4', 'E4', 'G4', 'A4', 'B4',
                'D5', 'E5', 'G5', 'A5', 'B5',
                'D6', 'E6', 'F#6', 'G6', 'A6']


def map_values_to(source, min_dest, max_dest):
    min_source = np.min(source)
    max_source = np.max(source)

    res = min_dest + \
          (source - min_source) / \
          (max_source - min_source) * \
          (max_dest - min_dest)

    return np.array(res)


def load_data():
    indexes = []
    values = []

    with open(g_csv_file, 'r') as file:
        csv_reader = csv.reader(file, delimiter=',')
        next(csv_reader)

        counter = 0

        for row in csv_reader:
            if len(indexes) == g_size_of_vals:
                break

            indexes.append(counter)
            values.append(int(row[6]))
            counter += 3

    np_indexes = np.array(indexes)
    np_values = np.array(values)

    np_values = np_values - np.min(np_values)

    return np_indexes, np_values


if __name__ == '__main__':
    indexes, values = load_data()

    note_midis = [pitch.Pitch(n).midi for n in g_note_names]

    notes_size = len(note_midis)
    midi_data = map_values_to(values, 0, notes_size - 1)

    midi_data = np.around(midi_data)
    midi_data = midi_data.astype(int)
    midi_data_size = len(midi_data)

    midi_data_pitches = []
    for i in range(0, midi_data_size):
        index = midi_data[i]
        midi_data_pitches.append(note_midis[index])

    mf = MIDIFile(1)  # only 1 track
    track = 0  # the only track
    time = 0  # start at the beginning
    mf.addTrackName(track, time, "Sample Track")
    mf.addTempo(track, time, g_beats_per_minute)
    channel = 0
    vol = 100
    midi_time = indexes / g_beats_per_minute
    dur = 1
    for i in range(0, midi_data_size):
        mf.addNote(track, channel, midi_data_pitches[i], midi_time[i], dur, vol)

    with open("output.mid", 'wb') as outf:
        mf.writeFile(outf)

    plt.scatter(midi_time, midi_data_pitches)
    plt.xlabel('time')
    plt.ylabel('pitches')
    plt.show()

    print(indexes, values)
