# Models Directory
This is the dedicated location to store your Machine Learning models.

## Expected Files
1. **Crop Doctor**: `plant_disease_model.onnx` (or `tfjs_model/`)
2. **Yield Predictor**: `yield_predictor.pkl` (or `.json`)
3. **Precision Nutrient**: `nutrient_classifier.joblib`

## How to use
In your API route (e.g., `src/app/api/ai/disease-detect/route.ts`), you will load models from this directory:
```typescript
const modelPath = path.join(process.cwd(), 'src/lib/models/plant_disease_model.onnx');
```
