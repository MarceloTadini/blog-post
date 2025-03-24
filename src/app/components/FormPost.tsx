import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FormPostProps, IPost } from "../types";

const validationSchema = Yup.object({
  title: Yup.string().min(3, "O título deve ter pelo menos 3 caracteres").required("Título é obrigatório"),
  author: Yup.string().required("Autor é obrigatório"),
  intro: Yup.string().max(150, "A introdução deve ter no máximo 150 caracteres").required("Introdução é obrigatória"),
  content: Yup.string().min(10, "O conteúdo deve ter pelo menos 10 caracteres").required("Conteúdo é obrigatório"),
  imageUrl: Yup.string(),
  videoUrl: Yup.string(),
});

const FormPost: React.FC<FormPostProps> = ({ initialData, onSubmit }) => {
  const router = useRouter();

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        {initialData ? "Editar Post" : "Criar Novo Post"}
      </h1>

      <Formik
        initialValues={{
          title: initialData?.title || "",
          author: initialData?.author || "",
          content: initialData?.content || "",
          intro: initialData?.intro || "",
          imageUrl: initialData?.imageUrl || "",
          videoUrl: initialData?.videoUrl || "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await onSubmit(values);
            router.push("/blog");
          } catch (error) {
            console.error("Erro ao salvar post", error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            {[
              { label: "Título", name: "title", type: "text" },
              { label: "Autor", name: "author", type: "text" },
              { label: "Introdução", name: "intro", type: "text" },
              { label: "URL da Imagem", name: "imageUrl", type: "text" },
              { label: "URL do Vídeo", name: "videoUrl", type: "text" },
            ].map(({ label, name, type }) => (
              <div key={name}>
                <label className="block text-sm font-semibold text-gray-700" htmlFor={name}>{label}</label>
                <Field
                  type={type}
                  name={name}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                />
                <ErrorMessage name={name} component="p" className="text-red-500 text-sm" />
              </div>
            ))}

            <div>
              <label className="block text-sm font-semibold text-gray-700">Conteúdo</label>
              <Field
                as="textarea"
                name="content"
                rows={5}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
              <ErrorMessage name="content" component="p" className="text-red-500 text-sm" />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 text-white rounded-lg transition cursor-pointer ${isSubmitting ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
              >
                {isSubmitting ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default FormPost;
