import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  info: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#444',
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 4,
  },

  comment: {
    marginTop: 12,
    padding: 10,
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
  },
  commentTitle: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 4,
  },
  commentText: {
    fontSize: 13,
    color: '#333',
  },
  
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginTop: 12,
    marginBottom: 8,
    fontSize: 14,
  },
});
