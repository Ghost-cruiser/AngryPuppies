using MVVM.Library.Patterns;
using MVVM_Library.Patterns;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace FacialRecognition
{
    public class FacialRecognitionService : Service<FacialRecognitionService>, IServiceProvidable
    {
        private bool _disposed;
        public override bool Disposed
        {
            get
            {
                return _disposed;
            }
        }

        private HttpClient client { get; set; }


        public async Task createFaceList(string faceListId, string name)
        {
            // Request parameters 
            var uri = "https://api.projectoxford.ai/face/v1.0/facelists/"+ faceListId+"?";

            // Request body
            string json = JsonConvert.SerializeObject(new { name = name });
            Send(json, uri);
        }
        public async Task<string> detectFace(string urlPicture)
        {
            string faceId = string.Empty;

            // Request parameters 
            var uri = "https://api.projectoxford.ai/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false";

            // Request body
            string json = JsonConvert.SerializeObject(new { url = urlPicture });

            var res = await Send(json, uri).Result.Content.ReadAsStringAsync();
            var array = JArray.Parse(res);
            foreach (JProperty item in array)
            {
                if (item.Name == "faceId")
                {
                    faceId = item.Value.ToString();
                    break;
                }
            }
            if (faceId == string.Empty)
                throw new Exception("FaceId was not retrieved");

            return faceId;
        }

        public async Task createFaceOnList(string faceListId, string faceId)
        {
            // Request parameters 
            var uri = "https://api.projectoxford.ai/face/v1.0/facelists/"+faceListId+"/persistedFaces?";

            HttpResponseMessage response;

            // Request body
            string json = JsonConvert.SerializeObject(new { url = faceId });
            Send(json, uri);
        }
        public async Task<List<string>> findSimilar(string faceListId, string faceId)
        {
            List<string> faceIds = new List<string>();

            var uri = "https://api.projectoxford.ai/face/v1.0/findsimilars?";
            // Request body
            string json = JsonConvert.SerializeObject(new { faceId = faceId, faceListId = faceListId, maxNumOfCandidatesReturned = 10, mode = "matchFace" });

            var response = await Send(json, uri).Result.Content.ReadAsStringAsync();

            foreach (var item in JArray.Parse(response))
            {
                foreach (JProperty prop in item)
                {
                    if (prop.Name == "persistedFaceId")
                    {
                        faceIds.Add(prop.Value.ToString());
                    }
                }
            }
            return faceIds;

        }

        private Task<HttpResponseMessage> Send(string json, string uri)
        {
            using (var content = new ByteArrayContent(Encoding.UTF8.GetBytes(json)))
            {
                content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
                return client.PostAsync(uri, content);
            }
        }

        public override void Build()
        {
            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", "7fe942d4280d417b9b3bcd36427959d8");
        }

        public override void Dispose()
        {
            _disposed = true;
        }
    }
}

    
